/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save( props ) {

	const { attributes, setAttributes } = props;
	const { images, layout, spacing, columns, enableLightbox } = attributes;
	var customClass = `block-nest-gallery-type-${layout} block-nest-gallery-col-${columns} block-nest-gallery-gutter-${spacing}`;
	const blockProps = useBlockProps.save({
		className: customClass
	});
	const galleryStyle = {
		'--bn--gallery--layout': `${layout}`,
		'--bn--gallery--col': `${columns}`,
		'--bn--gallery--gutter': `${spacing}px`,
	}

	return (
		<div { ...blockProps } style={ galleryStyle }>
			{images && images.map((image, index) => (
				enableLightbox ? (
					<a href={image.url} className={`gallery-item`} key={index}>
						<img 
							src={image.url}
							alt={image.alt}
							key={index}
						/>
					</a>
				) : (
					<div className={`gallery-item`} key={index}>
						<img 
							src={image.url}
							alt={image.alt}
							key={index}
						/>
					</div>
				)
			))}
		</div>
	);
}
