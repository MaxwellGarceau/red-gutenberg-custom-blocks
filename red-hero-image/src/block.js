// const { __, setLocaleData } = wp.i18n;
const {
	registerBlockType
} = wp.blocks;
const {
	RichText,
	MediaUpload,
	BlockControls,
	AlignmentToolbar,
	InspectorControls
} = wp.editor;
const { 
	Button,
	TextControl
} = wp.components;

// setLocaleData( window.leadership_team_gallery.localeData, 'red-gutenberg-blocks' );

registerBlockType( 'red-gutenberg-blocks/red-hero-image', {
	title: 'Red Hero Image',
	icon: 'index-card',
	category: 'layout',
	attributes: {
		mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string',
			// source: 'attribute',
			// selector: 'img',
			// attribute: 'src',
		},
		text: {
			type: 'array',
			source: 'children',
			selector: '.red-hero-image__text',
		},
		subText: {
			type: 'array',
			source: 'children',
			selector: '.red-hero-image__sub-text',
		}
	},
	edit: ( props ) => {
		const {
			className,
			attributes: {
				mediaID,
				mediaURL,
				text,
				subText
			},
			setAttributes,
		} = props;

		const onChangeText = ( value ) => {
			setAttributes( { text: value } );
		};
		const onChangeSubText = ( value ) => {
			setAttributes( { subText: value } );
		};
		const onSelectImage = ( media ) => {
			setAttributes( {
				mediaURL: media.url,
				mediaID: media.id,
			} );
		};

		return (
			<div className={ `red-hero-image__background-image editor ${className}` }>
				<MediaUpload
					onSelect={ onSelectImage }
					type="image"
					value={ mediaID }
					render={ ( { open } ) => (
						<div className="red-hero-image__text-editor-container">

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
							<RichText
								tagName="h3"
								placeholder={ 'Sub Text' }
								value={ subText }
								onChange={ onChangeSubText }
								className="red-hero-image__sub-text editor"
							/>

						</div>
					) }
				/>

			</div>
		);
	},
	save: ( props ) => {
		const {
			className,
			attributes: {
				mediaID,
				mediaURL,
				text,
				subText
			},
		} = props;
		const backgroundImage = {
			backgroundImage: `url('${ mediaURL }')`
		};
		return (
			<div
				className={ `red-hero-image__background-image ${ className }` }
				style={ backgroundImage }
			>

				<RichText.Content
					tagName="h2"
					value={ text }
					className="red-hero-image__text hero-image-row__title"
				/>

				<RichText.Content 
					tagName="h3"
					value={ subText }
					className="red-hero-image__sub-text"
				/>

			</div>
		);
	},
} );
