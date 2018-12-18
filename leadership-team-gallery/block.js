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

registerBlockType( 'red-gutenberg-blocks/leadership-team-gallery', {
	title: 'Leadership Team Gallery Block',
	icon: 'index-card',
	category: 'layout',
	attributes: {
		mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		name: {
			type: 'array',
			source: 'children',
			selector: '.leadership-team-gallery__name',
		},
		title: {
			type: 'array',
			source: 'children',
			selector: '.leadership-team-gallery__title',
		},
		description: {
			type: 'array',
			source: 'children',
			selector: '.leadership-team-gallery__description',
		},
		facebookURL: {
			source: 'attribute',
			attribute: 'href',
			selector: 'a',
		},
		twitterURL: {
			source: 'attribute',
			attribute: 'href',
			selector: 'a',
		},
		pinterestURL: {
			source: 'attribute',
			attribute: 'href',
			selector: 'a',
		},
	},
	edit: ( props ) => {
		const {
			className,
			attributes: {
				name,
				title,
				mediaID,
				mediaURL,
				description,
				facebookURL,
				twitterURL,
				pinterestURL
			},
			setAttributes,
		} = props;

		const onChangeName = ( value ) => {
			setAttributes( { name: value } );
		};
		const onChangeTitle = ( value ) => {
			setAttributes( { title: value } );
		};
		const onChangeDescription = ( value ) => {
			setAttributes( { description: value } );
		};
		const onSelectImage = ( media ) => {
			setAttributes( {
				mediaURL: media.url,
				mediaID: media.id,
			} );
		};
		const onChangeFacebookURL = ( url ) => {
			setAttributes( {
				facebookURL: url
			} );
		};
		const onChangeTwitterURL = ( url ) => {
			setAttributes( {
				twitterURL: url
			} );
		};
		const onChangePinterestURL = ( url ) => {
			setAttributes( {
				pinterestURL: url
			} );
		};

		return (
			<div className={ `leadership-team-gallery__block ${className}` }>
        <InspectorControls>
					<TextControl
						format="string"
						type="text"
		        label="Facebook URL (Must include full url)"
		        placeholder="https://www.facebook.com"
		        value={ facebookURL }
		        onChange={ onChangeFacebookURL }
	    		/>
					<TextControl
						format="string"
						type="text"
		        label="Twitter URL (Must include full url)"
		        placeholder="https://www.twitter.com"
		        value={ twitterURL }
		        onChange={ onChangeTwitterURL }
	    		/>
					<TextControl
						format="string"
						type="text"
		        label="Pinterest URL (Must include full url)"
		        placeholder="https://www.pinterest.com"
		        value={ pinterestURL }
		        onChange={ onChangePinterestURL }
	    		/>
        </InspectorControls>
				<MediaUpload
					onSelect={ onSelectImage }
					type="image"
					value={ mediaID }
					render={ ( { open } ) => (
						<Button className={ mediaID ? 'image-button' : 'button button-large' } onClick={ open }>
							{ ! mediaID ? 'Upload Image' : <img src={ mediaURL } alt={ 'Upload Employee Photo' } /> }
						</Button>
					) }
				/>
				<RichText
					tagName="div"
					placeholder={ 'Employee Name' }
					value={ name }
					onChange={ onChangeName }
					className="leadership-team-gallery__name"
				/>
				<RichText
					tagName="div"
					placeholder={ 'Employee Title' }
					value={ title }
					onChange={ onChangeTitle }
					className="leadership-team-gallery__title"
				/>
				<RichText
					tagName="div"
					placeholder={ 'Employee Description' }
					value={ description }
					onChange={ onChangeDescription }
					className="leadership-team-gallery__description"
				/>
				<p className="information-text">*Set social media links in the sidebar</p>
			</div>
		);
	},
	save: ( props ) => {
		const {
			className,
			attributes: {
				name,
				title,
				mediaURL,
				description,
				facebookURL,
				twitterURL,
				pinterestURL
			},
		} = props;
		return (
			<div
				className={ `leadership-team-gallery__block ${className}` }
			>

				{
					mediaURL && (
						<img
							src={ mediaURL }
							alt={ 'Employee Image' } 
						/>
					)
				}

				<RichText.Content
					tagName="div"
					value={ name }
					className="leadership-team-gallery__name"
				/>

				<RichText.Content 
					tagName="div"
					value={ title }
					className="leadership-team-gallery__title"
				/>

				<RichText.Content 
					tagName="div"
					value={ description }
					className="leadership-team-gallery__description"
				/>

	  	  <div class="leadership-team-gallery__social-media">
	  	    <a target="_blank" href={ facebookURL }><i class="fab fa-facebook-f"></i></a>
	  	    <a target="_blank" href={ twitterURL }><i class="fab fa-twitter"></i></a>
	  	    <a target="_blank" href={ pinterestURL }><i class="fab fa-pinterest"></i></a>
	  	  </div>

			</div>
		);
	},
} );
