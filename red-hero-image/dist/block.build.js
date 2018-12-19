'use strict';

// const { __, setLocaleData } = wp.i18n;
var registerBlockType = wp.blocks.registerBlockType;
var _wp$editor = wp.editor,
    RichText = _wp$editor.RichText,
    MediaUpload = _wp$editor.MediaUpload,
    BlockControls = _wp$editor.BlockControls,
    AlignmentToolbar = _wp$editor.AlignmentToolbar,
    InspectorControls = _wp$editor.InspectorControls,
    InnerBlocks = _wp$editor.InnerBlocks;
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
    },
    textCustomClass: {
      type: 'string'
      // source: 'attribute',
      // selector: '.red-hero-image__text',
      // attribute: 'className',
    },
    subTextCustomClass: {
      type: 'string'
      // source: 'attribute',
      // selector: '.red-hero-image__sub-text',
      // attribute: 'className',
    }
  },
  edit: function edit(props) {
    var _props$attributes = props.attributes,
        mediaID = _props$attributes.mediaID,
        mediaURL = _props$attributes.mediaURL,
        text = _props$attributes.text,
        subText = _props$attributes.subText,
        textCustomClass = _props$attributes.textCustomClass,
        subTextCustomClass = _props$attributes.subTextCustomClass,
        setAttributes = props.setAttributes;


    var onChangeText = function onChangeText(value) {
      setAttributes({ text: value });
    };
    var onChangeSubText = function onChangeSubText(value) {
      setAttributes({ subText: value });
    };
    var onChangeTextCustomClass = function onChangeTextCustomClass(value) {
      setAttributes({ textCustomClass: value });
    };
    var onChangeSubTextCustomClass = function onChangeSubTextCustomClass(value) {
      setAttributes({ subTextCustomClass: value });
    };
    var onSelectImage = function onSelectImage(media) {
      setAttributes({
        mediaURL: media.url,
        mediaID: media.id
      });
    };

    return React.createElement(
      'div',
      { className: 'red-hero-image__background-image editor' },
      React.createElement(
        InspectorControls,
        null,
        React.createElement(TextControl, {
          format: 'string',
          type: 'text',
          label: 'Text Custom Classs',
          placeholder: 'my-text-custom-class',
          value: textCustomClass,
          onChange: onChangeTextCustomClass
        }),
        React.createElement(TextControl, {
          format: 'string',
          type: 'text',
          label: 'Sub Text Custom Class',
          placeholder: 'my-sub-text-custom-class',
          value: subTextCustomClass,
          onChange: onChangeSubTextCustomClass
        })
      ),
      React.createElement(MediaUpload, {
        onSelect: onSelectImage,
        type: 'image',
        value: mediaID,
        render: function render(_ref) {
          var open = _ref.open;
          return React.createElement(
            'div',
            { className: 'red-hero-image__text-editor-container' },
            React.createElement(InnerBlocks, null),
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
    var _props$attributes2 = props.attributes,
        mediaID = _props$attributes2.mediaID,
        mediaURL = _props$attributes2.mediaURL,
        text = _props$attributes2.text,
        subText = _props$attributes2.subText,
        textCustomClass = _props$attributes2.textCustomClass,
        subTextCustomClass = _props$attributes2.subTextCustomClass;

    var backgroundImage = {
      backgroundImage: 'url(\'' + mediaURL + '\')'
    };
    return React.createElement(
      'div',
      {
        className: 'red-hero-image__background-image',
        style: backgroundImage
      },
      React.createElement(RichText.Content, {
        tagName: 'h2',
        value: text,
        className: 'red-hero-image__text hero-image-row__title ' + textCustomClass
      }),
      React.createElement(RichText.Content, {
        tagName: 'h3',
        value: subText,
        className: 'red-hero-image__sub-text ' + subTextCustomClass
      }),
      React.createElement(InnerBlocks.Content, null)
    );
  }
});