'use strict';

// const { __, setLocaleData } = wp.i18n;
var registerBlockType = wp.blocks.registerBlockType;
var _wp$editor = wp.editor,
    RichText = _wp$editor.RichText,
    MediaUpload = _wp$editor.MediaUpload,
    BlockControls = _wp$editor.BlockControls,
    AlignmentToolbar = _wp$editor.AlignmentToolbar,
    InspectorControls = _wp$editor.InspectorControls;
var _wp$components = wp.components,
    Button = _wp$components.Button,
    TextControl = _wp$components.TextControl;

// setLocaleData( window.leadership_team_gallery.localeData, 'red-gutenberg-blocks' );

registerBlockType('red-gutenberg-blocks/red-hero-image', {
  title: 'Red Hero Image',
  icon: 'index-card',
  category: 'layout',
  attributes: {
    mediaID: {
      type: 'number'
    },
    mediaURL: {
      type: 'string'
      // source: 'attribute',
      // selector: 'img',
      // attribute: 'src',
    },
    text: {
      type: 'array',
      source: 'children',
      selector: '.red-hero-image__text'
    },
    subText: {
      type: 'array',
      source: 'children',
      selector: '.red-hero-image__sub-text'
    }
  },
  edit: function edit(props) {
    var className = props.className,
        _props$attributes = props.attributes,
        mediaID = _props$attributes.mediaID,
        mediaURL = _props$attributes.mediaURL,
        text = _props$attributes.text,
        subText = _props$attributes.subText,
        setAttributes = props.setAttributes;


    var onChangeText = function onChangeText(value) {
      setAttributes({ text: value });
    };
    var onChangeSubText = function onChangeSubText(value) {
      setAttributes({ subText: value });
    };
    var onSelectImage = function onSelectImage(media) {
      setAttributes({
        mediaURL: media.url,
        mediaID: media.id
      });
    };

    return React.createElement(
      'div',
      { className: 'red-hero-image__background-image editor ' + className },
      React.createElement(MediaUpload, {
        onSelect: onSelectImage,
        type: 'image',
        value: mediaID,
        render: function render(_ref) {
          var open = _ref.open;
          return React.createElement(
            'div',
            { className: 'red-hero-image__text-editor-container' },
            React.createElement(
              Button,
              { className: mediaID ? 'image-button' : 'button button-large', onClick: open },
              !mediaID ? 'Upload Image' : React.createElement('img', { src: mediaURL, alt: 'Upload Employee Photo' })
            ),
            React.createElement(RichText, {
              tagName: 'h2',
              placeholder: 'Text',
              value: text,
              onChange: onChangeText,
              className: 'red-hero-image__text editor'
            }),
            React.createElement(RichText, {
              tagName: 'h3',
              placeholder: 'Sub Text',
              value: subText,
              onChange: onChangeSubText,
              className: 'red-hero-image__sub-text editor'
            })
          );
        }
      })
    );
  },
  save: function save(props) {
    var className = props.className,
        _props$attributes2 = props.attributes,
        mediaID = _props$attributes2.mediaID,
        mediaURL = _props$attributes2.mediaURL,
        text = _props$attributes2.text,
        subText = _props$attributes2.subText;

    var backgroundImage = {
      backgroundImage: 'url(\'' + mediaURL + '\')'
    };
    return React.createElement(
      'div',
      {
        className: 'red-hero-image__background-image ' + className,
        style: backgroundImage
      },
      React.createElement(RichText.Content, {
        tagName: 'h2',
        value: text,
        className: 'red-hero-image__text hero-image-row__title'
      }),
      React.createElement(RichText.Content, {
        tagName: 'h3',
        value: subText,
        className: 'red-hero-image__sub-text'
      })
    );
  }
});