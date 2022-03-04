import {omit, startsWith} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import RichTextEditor from 'react-rte';
import cx from 'classnames';

class RichTextMarkdown extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    editorStyle: PropTypes.object,
    showToolbar: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    showToolbar: true,
  };

  state = {
    value:
      this.props.input.value === ''
        ? RichTextEditor.createEmptyValue()
        : RichTextEditor.createValueFromString(
            this.props.input.value,
            'markdown'
          ),
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.input.value !== prevProps.input.value &&
      this.props.input.value !== this.state.value.toString('markdown')
    ) {
      this.setState({
        value: this.props.input.value
          ? RichTextEditor.createValueFromString(
              this.props.input.value,
              'markdown'
            )
          : RichTextEditor.createEmptyValue(),
      });
    }
  }

  focus = ev => {
    if (!startsWith(ev.target.className, 'InputPopover__input___')) {
      this.editor._focus();
    }
  };

  handleChange = value => {
    const isTextChanged =
      this.state.value.toString('markdown') !== value.toString('markdown');
    this.setState({value}, () => {
      if (isTextChanged) {
        this.props.input.onChange(value.toString('markdown'));
      }
    });
  };

  render() {
    const {
      editorClassName,
      editorStyle,
      input,
      meta: {error, touched, warning},
      ...props
    } = this.props;
    const errMsg = error || warning;
    const showErr = Boolean(touched && errMsg);

    return (
      <div
        onClick={this.focus}
        className={cx('relative h-100', this.props.className)}
      >
        <RichTextEditor
          {...omit(input, ['onFocus'])}
          {...props}
          ref={ref => {
            this.editor = ref;
          }}
          customStyleMap={{
            BOLD: {
              fontWeight: 400,
              fontFamily: 'AvenirLTStd-Heavy',
            },
            ITALIC: this.props.italicDisabled ? {} : {fontStyle: 'italic'},
          }}
          placeholder={this.props.placeholder}
          value={this.state.value}
          toolbarConfig={{
            display: [
              'INLINE_STYLE_BUTTONS',
              'BLOCK_TYPE_BUTTONS',
              'LINK_BUTTONS',
              'HISTORY_BUTTONS',
            ],
            INLINE_STYLE_BUTTONS: [
              {label: 'Bold', style: 'BOLD', className: 'o-60'},
              !this.props.italicDisabled && {
                label: 'Italic',
                style: 'ITALIC',
                className: 'o-60',
              },
            ].filter(Boolean),
            BLOCK_TYPE_BUTTONS: [
              {label: 'UL', style: 'unordered-list-item', className: 'o-60'},
              {label: 'OL', style: 'ordered-list-item', className: 'o-60'},
            ],
          }}
          editorClassName={cx('avenir-light', editorClassName)}
          editorStyle={editorStyle}
          toolbarStyle={{display: !this.props.showToolbar ? 'none' : 'block'}}
          onChange={this.handleChange}
        />
        {showErr && (
          <div className="error absolute top-0 right-0 flex pl2 items-center f6 brand bg-white">
            {errMsg}
            <style jsx>{`
              .error {
                min-height: 39px;
                right: 11px;
                top: 52px;
              }
            `}</style>
          </div>
        )}
      </div>
    );
  }
}

export default RichTextMarkdown;
