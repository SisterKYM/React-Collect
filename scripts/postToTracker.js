const {execSync} = require('child_process');

const axios = require('axios');

const client = axios.create({
  baseURL: `https://www.pivotaltracker.com/services/v5/`,
  headers: {
    'X-TrackerToken': process.env.PIVOTAL_TOKEN,
  },
});

function siteName() {
  const branch =
    process.env.CIRCLE ||
    execSync('git rev-parse --abbrev-ref HEAD').toString();

  return branch.replace('brands/', '');
}

const pivotalProjectId = process.env.PIVOTAL_PROJECT_ID;

async function getLabelData() {
  try {
    const labels = await client.get(`projects/${pivotalProjectId}/labels`);
    const cleanedSiteName = siteName()
      .toLowerCase()
      .trim()
      .replace(/v\d+.\d+.\d+/, 'prod');
    const deployedLabelName = `deployed: ${cleanedSiteName}`.trim();
    const matchingBranchLabel = labels.data.find((l) => {
      return l.name.trim() === deployedLabelName;
    });
    if (matchingBranchLabel) {
      return matchingBranchLabel;
    }
    const createdLabel = await client.post(
      `projects/${pivotalProjectId}/labels`,
      {
        name: deployedLabelName,
      }
    );

    return createdLabel.data;
  } catch (err) {
    console.log(JSON.stringify(err));

    return [];
  }
}

async function gatherCommitData() {
  const github = axios.create({
    baseURL: 'https://api.github.com/repos/cheddarup/cheddar_up_ui',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });
  const date = new Date(new Date().setDate(new Date().getDate() - 90));
  const commits = await github.get('/commits', {
    since: date.toISOString(),
    per_page: 100,
  });
  const gitData = {};
  commits.data.forEach((commit) => {
    const sha = commit.sha;
    const message = commit.commit.message;
    const prStoryIds = [
      ...message.matchAll(/merge pull request #\d+ from cheddarup\/(\d+)/i),
    ].map((i) => i[1]);
    const commitStoryIds = [...message.matchAll(/#(\d+)]/i)].map((i) => i[1]);
    const branchStoryIds = [...message.matchAll(/origin\/(\d+)]/i)].map(
      (i) => i[1]
    );
    const storyIds = [...prStoryIds, ...commitStoryIds, ...branchStoryIds];
    storyIds.forEach((story) => {
      gitData[story] = gitData[story] || [];
      gitData[story].push({
        sha,
        message,
      });
    });
  });

  return gitData;
}

async function getMatchingStories(storyIds) {
  try {
    const storiesRes = await client.get(
      `projects/${pivotalProjectId}/stories`,
      {
        params: {
          filter: `id:${storyIds.join(',')}`,
          limit: 300,
        },
      }
    );

    return (storiesRes && storiesRes.data) || [];
  } catch (err) {
    console.log(JSON.stringify(err));

    return [];
  }
}

async function run() {
  console.log('Posting to Tracker');
  const gitData = await gatherCommitData();
  const branchLabel = await getLabelData();
  const branchName = siteName();
  const matchingStories = await getMatchingStories(Object.keys(gitData));
  const filteredStories = matchingStories.filter((i) => {
    const labeled = i.labels.find((l) => l.id === branchLabel.id);

    return (
      !labeled ||
      (labeled && ['rejected', 'finished'].includes(i.current_state))
    );
  });

  let storiesUpdated = 0;
  let storiesSkipped = 0;
  for (const story of filteredStories) {
    console.log(`Updating ${story.id}`);
    const commits = gitData[story.id];
    let comment = `[Deploy-Bot]: Marked as deployed to ${branchName.trim()}. Related commits: `;
    commits.forEach((commit) => {
      comment += '\n';
      comment += `[${commit.sha}] ${commit.message}`;
    });
    // eslint-disable-next-line no-await-in-loop
    const comments = await client.get(
      `projects/${pivotalProjectId}/stories/${story.id}/comments`
    );
    const commentTexts = comments.data.map((i) => i.text);
    if (commentTexts.includes(comment)) {
      console.log(
        `${story.id} previously updated for ${commits
          .map((i) => i.sha)
          .join(',')}, skipping update.`
      );
      storiesSkipped += 1;
      continue;
    }
    storiesUpdated += 1;
    // eslint-disable-next-line no-await-in-loop
    await client.put(`projects/${pivotalProjectId}/stories/${story.id}`, {
      current_state:
        story.current_state === 'finished' ? 'delivered' : story.current_state,
      labels: [...story.labels, branchLabel],
    });

    // eslint-disable-next-line no-await-in-loop
    await client.post(
      `projects/${pivotalProjectId}/stories/${story.id}/comments`,
      {
        text: comment,
      }
    );
  }
  console.log(`${storiesUpdated} updated, ${storiesSkipped} skipped`);
}

run();
