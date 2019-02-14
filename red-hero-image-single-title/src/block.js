// const { __, setLocaleData } = wp.i18n;
const {
	registerBlockType
} = wp.blocks;
const {
	RichText,
	MediaUpload,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	InnerBlocks
} = wp.editor;
const { 
	Button,
	TextControl
} = wp.components;

// setLocaleData( window.leadership_team_gallery.localeData, 'red-gutenberg-blocks' );

registerBlockType( 'red-gutenberg-blocks/red-hero-image-single-title', {
	title: 'Red Hero Image (Single Title)',
	icon: 'index-card',
	category: 'layout',
	attributes: {
		mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string'
		},
		text: {
			type: 'array',
			source: 'children',
			selector: '.red-hero-image__text',
		},
		textCustomClass: {
			type: 'string',
			// source: 'attribute',
			// selector: '.red-hero-image__text',
			// attribute: 'className',
		}
	},
	edit: ( props ) => {
		const {
			attributes: {
				mediaID,
				mediaURL,
				text,
				textCustomClass
			},
			setAttributes,
		} = props;

		const onChangeText = ( value ) => {
			setAttributes( { text: value } );
		};
		const onChangeTextCustomClass = ( value ) => {
			setAttributes( { textCustomClass: value } );
		};
		const onSelectImage = ( media ) => {
			setAttributes( {
				mediaURL: media.url,
				mediaID: media.id,
			} );
		};

		return (
			<div className={ `red-hero-image__background-image editor` }>

        <InspectorControls>
					<TextControl
						format="string"
						type="text"
		        label="Text Custom Classs"
		        placeholder="my-text-custom-class"
		        value={ textCustomClass }
		        onChange={ onChangeTextCustomClass }
	    		/>
        </InspectorControls>

				<MediaUpload
					onSelect={ onSelectImage }
					type="image"
					value={ mediaID }
					render={ ( { open } ) => (
						<div className="red-hero-image__text-editor-container">

				      <InnerBlocks />

							<Button className={ mediaID ? 'image-button' : 'button button-large' } onClick={ open }>
								{ ! mediaID ? 'Upload Image' : <img src={ mediaURL } alt={ 'Upload Employee Photo' } /> }
							</Button>

							<RichText
								tagName="h2"
								placeholder={ 'Text' }
								value={ text }
								onChange={ onChangeText }
								className="red-hero-image__text editor"
							/>

						</div>
					) }
				/>

			</div>
		);
	},
	save: ( props ) => {
		const {
			attributes: {
				mediaID,
				mediaURL,
				text,
				textCustomClass
			},
		} = props;
		const backgroundImage = {
			backgroundImage: `url('${ mediaURL }')`
		};
		const textCustomClassValidated = textCustomClass ? `${' ' + textCustomClass}` : '';
		return (
			<div
				className={ `red-hero-image__background-image` }
				style={ backgroundImage }
			>

				<RichText.Content
					tagName="h2"
					value={ text }
					className={`red-hero-image__text hero-image-row__title${ textCustomClassValidated }`}
				/>

				<InnerBlocks.Content />

			</div>
		);
	},
} );
