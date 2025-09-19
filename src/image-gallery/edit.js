/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, MediaUpload, MediaPlaceholder, InspectorControls, } from '@wordpress/block-editor';
import { Button, PanelBody, SelectControl, RangeControl,CheckboxControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( props ) {

	const { attributes, setAttributes } = props;
	const { images, layout, spacing, columns, lightbox } = attributes;

	console.log( 'images:', images );
	console.log( 'images length', images.length );


	return (
		<>
		{images?.length === 0 ? (
			<MediaPlaceholder
				onSelect={(images) => setAttributes({ images })}
				accept="image/*"
				allowedTypes={["image"]}
				multiple
				labels={{
					title: __( "Gallery Images", "block-nest" ),
					instructions:
						__( "Drag images files, upload or select files from your library.", "block-nest" ),
				}}
			/>
		) : (

			<MediaUpload
				allowedTypes={['image']}
				multiple={true}
				gallery={true}
				render={({ open }) => (
					<Button variant="primary" onClick={open}>
						{__('Add Images', 'block-nest')}
					</Button>
				)}
			/>

		)}

		{ images && images.length > 0 && (
		<div>
			{images.map((image, index) => (
			<a key={index}>
				<img 
					src={image.url}
					alt={image.alt}
					key={index}
				/>
			</a>
			))}
		</div>
		)}
		
		</>

	);
}
