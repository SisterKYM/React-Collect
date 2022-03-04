import cx from 'classnames';
import React from 'react';
import RichTextEditor from 'react-rte';

const MarkdownParagraph = ({id, className, markdown}) => (
  <p
    id={id}
    className={cx('markdown', className)}
    dangerouslySetInnerHTML={{
      __html: RichTextEditor.createValueFromString(markdown, 'markdown')
        .toString('html')
        .replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ')
        .replace(/<h1>/g, '<p>'),
    }}
  />
);

const EnhancedMarkdownParagraph = React.memo(MarkdownParagraph);

export default EnhancedMarkdownParagraph;
