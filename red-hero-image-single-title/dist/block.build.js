"use strict";

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
    TextControl = _wp$components.TextControl; // setLocaleData( window.leadership_team_gallery.localeData, 'red-gutenberg-blocks' );

registerBlockType('red-gutenberg-blocks/red-hero-image-single-title', {
  title: 'Red Hero Image (Single Title)',
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
    textCustomClass: {
      type: 'string' // source: 'attribute',
      // selector: '.red-hero-image__text',
      // attribute: 'className',

    }
  },
  edit: function edit(props) {
    var _props$attributes = props.attributes,
        mediaID = _props$attributes.mediaID,
        mediaURL = _props$attributes.mediaURL,
        text = _props$attributes.text,
        textCustomClass = _props$attributes.textCustomClass,
        setAttributes = props.setAttributes;

    var onChangeText = function onChangeText(value) {
      setAttributes({
        text: value
      });
    };

    var onChangeTextCustomClass = function onChangeTextCustomClass(value) {
      setAttributes({
        textCustomClass: value
      });
    };

    var onSelectImage = function onSelectImage(media) {
      setAttributes({
        mediaURL: media.url,
        mediaID: media.id
      });
    };

    return React.createElement("div", {
      className: "red-hero-image__background-image editor"
    }, React.createElement(InspectorControls, null, React.createElement(TextControl, {
      format: "string",
      type: "text",
      label: "Text Custom Classs",
      placeholder: "my-text-custom-class",
      value: textCustomClass,
      onChange: onChangeTextCustomClass
    })), React.createElement(MediaUpload, {
      onSelect: onSelectImage,
      type: "image",
      value: mediaID,
      render: function render(_ref) {
        var open = _ref.open;
        return React.createElement("div", {
          className: "red-hero-image__text-editor-container"
        }, React.createElement(InnerBlocks, null), React.createElement(Button, {
          className: mediaID ? 'image-button' : 'button button-large',
          onClick: open
        }, !mediaID ? 'Upload Image' : React.createElement("img", {
          src: mediaURL,
          alt: 'Upload Employee Photo'
        })), React.createElement(RichText, {
          tagName: "h2",
          placeholder: 'Text',
          value: text,
          onChange: onChangeText,
          className: "red-hero-image__text editor"
        }));
      }
    }));
  },
  save: function save(props) {
    var _props$attributes2 = props.attributes,
        mediaID = _props$attributes2.mediaID,
        mediaURL = _props$attributes2.mediaURL,
        text = _props$attributes2.text,
        textCustomClass = _props$attributes2.textCustomClass;
    var backgroundImage = {
      backgroundImage: "url('".concat(mediaURL, "')")
    };
    var textCustomClassValidated = textCustomClass ? "".concat(' ' + textCustomClass) : '';
    return React.createElement("div", {
      className: "red-hero-image__background-image",
      style: backgroundImage
    }, React.createElement(RichText.Content, {
      tagName: "h2",
      value: text,
      className: "red-hero-image__text hero-image-row__title".concat(textCustomClassValidated)
    }), React.createElement(InnerBlocks.Content, null));
  }
});