module.exports = {
  '**/*.{js,ts,tsx,json,yml,yaml}': ['prettier --write', 'git add'],
  '**/*.{js}': ['eslint --ext .js,.ts,.tsx --cache --fix', 'git add'],
};
