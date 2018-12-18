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

registerBlockType('red-gutenberg-blocks/leadership-team-gallery', {
  title: 'Leadership Team Gallery Block',
  icon: 'index-card',
  category: 'layout',
  attributes: {
    mediaID: {
      type: 'number'
    },
    mediaURL: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'src'
    },
    name: {
      type: 'array',
      source: 'children',
      selector: '.leadership-team-gallery__name'
    },
    title: {
      type: 'array',
      source: 'children',
      selector: '.leadership-team-gallery__title'
    },
    description: {
      type: 'array',
      source: 'children',
      selector: '.leadership-team-gallery__description'
    },
    facebookURL: {
      source: 'attribute',
      attribute: 'href',
      selector: 'a'
    },
    twitterURL: {
      source: 'attribute',
      attribute: 'href',
      selector: 'a'
    },
    pinterestURL: {
      source: 'attribute',
      attribute: 'href',
      selector: 'a'
    }
  },
  edit: function edit(props) {
    var className = props.className,
        _props$attributes = props.attributes,
        name = _props$attributes.name,
        title = _props$attributes.title,
        mediaID = _props$attributes.mediaID,
        mediaURL = _props$attributes.mediaURL,
        description = _props$attributes.description,
        facebookURL = _props$attributes.facebookURL,
        twitterURL = _props$attributes.twitterURL,
        pinterestURL = _props$attributes.pinterestURL,
        setAttributes = props.setAttributes;


    var onChangeName = function onChangeName(value) {
      setAttributes({ name: value });
    };
    var onChangeTitle = function onChangeTitle(value) {
      setAttributes({ title: value });
    };
    var onChangeDescription = function onChangeDescription(value) {
      setAttributes({ description: value });
    };
    var onSelectImage = function onSelectImage(media) {
      setAttributes({
        mediaURL: media.url,
        mediaID: media.id
      });
    };
    var onChangeFacebookURL = function onChangeFacebookURL(url) {
      setAttributes({
        facebookURL: url
      });
    };
    var onChangeTwitterURL = function onChangeTwitterURL(url) {
      setAttributes({
        twitterURL: url
      });
    };
    var onChangePinterestURL = function onChangePinterestURL(url) {
      setAttributes({
        pinterestURL: url
      });
    };

    return React.createElement(
      'div',
      { className: 'leadership-team-gallery__block ' + className },
      React.createElement(
        InspectorControls,
        null,
        React.createElement(TextControl, {
          format: 'string',
          type: 'text',
          label: 'Facebook URL (Must include full url)',
          placeholder: 'https://www.facebook.com',
          value: facebookURL,
          onChange: onChangeFacebookURL
        }),
        React.createElement(TextControl, {
          format: 'string',
          type: 'text',
          label: 'Twitter URL (Must include full url)',
          placeholder: 'https://www.twitter.com',
          value: twitterURL,
          onChange: onChangeTwitterURL
        }),
        React.createElement(TextControl, {
          format: 'string',
          type: 'text',
          label: 'Pinterest URL (Must include full url)',
          placeholder: 'https://www.pinterest.com',
          value: pinterestURL,
          onChange: onChangePinterestURL
        })
      ),
      React.createElement(MediaUpload, {
        onSelect: onSelectImage,
        type: 'image',
        value: mediaID,
        render: function render(_ref) {
          var open = _ref.open;
          return React.createElement(
            Button,
            { className: mediaID ? 'image-button' : 'button button-large', onClick: open },
            !mediaID ? 'Upload Image' : React.createElement('img', { src: mediaURL, alt: 'Upload Employee Photo' })
          );
        }
      }),
      React.createElement(RichText, {
        tagName: 'div',
        placeholder: 'Employee Name',
        value: name,
        onChange: onChangeName,
        className: 'leadership-team-gallery__name'
      }),
      React.createElement(RichText, {
        tagName: 'div',
        placeholder: 'Employee Title',
        value: title,
        onChange: onChangeTitle,
        className: 'leadership-team-gallery__title'
      }),
      React.createElement(RichText, {
        tagName: 'div',
        placeholder: 'Employee Description',
        value: description,
        onChange: onChangeDescription,
        className: 'leadership-team-gallery__description'
      }),
      React.createElement(
        'p',
        { className: 'information-text' },
        '*Set social media links in the sidebar'
      )
    );
  },
  save: function save(props) {
    var className = props.className,
        _props$attributes2 = props.attributes,
        name = _props$attributes2.name,
        title = _props$attributes2.title,
        mediaURL = _props$attributes2.mediaURL,
        description = _props$attributes2.description,
        facebookURL = _props$attributes2.facebookURL,
        twitterURL = _props$attributes2.twitterURL,
        pinterestURL = _props$attributes2.pinterestURL;

    return React.createElement(
      'div',
      {
        className: 'leadership-team-gallery__block ' + className
      },
      mediaURL && React.createElement('img', {
        src: mediaURL,
        alt: 'Employee Image'
      }),
      React.createElement(RichText.Content, {
        tagName: 'div',
        value: name,
        className: 'leadership-team-gallery__name'
      }),
      React.createElement(RichText.Content, {
        tagName: 'div',
        value: title,
        className: 'leadership-team-gallery__title'
      }),
      React.createElement(RichText.Content, {
        tagName: 'div',
        value: description,
        className: 'leadership-team-gallery__description'
      }),
      React.createElement(
        'div',
        { 'class': 'leadership-team-gallery__social-media' },
        React.createElement(
          'a',
          { target: '_blank', href: facebookURL },
          React.createElement('i', { 'class': 'fab fa-facebook-f' })
        ),
        React.createElement(
          'a',
          { target: '_blank', href: twitterURL },
          React.createElement('i', { 'class': 'fab fa-twitter' })
        ),
        React.createElement(
          'a',
          { target: '_blank', href: pinterestURL },
          React.createElement('i', { 'class': 'fab fa-pinterest' })
        )
      )
    );
  }
});