import { __ } from '@wordpress/i18n';
import { 
	useBlockProps, 
	MediaUpload, 
	MediaPlaceholder, 
	MediaUploadCheck, 
	InspectorControls, 
	BlockControls 
} from '@wordpress/block-editor';
import { 
	Button, 
	PanelBody, 
	SelectControl, 
	RangeControl, 
	ToggleControl, 
	ToolbarGroup, 
	ToolbarItem, 
	ToolbarButton 
} from '@wordpress/components';
import { 
	Fragment 
} from "@wordpress/element";
import './editor.scss';

export default function Edit( props ) {

	const { attributes, setAttributes } = props;
	const { images, layout, spacing, columns, enableLightbox } = attributes;
	var customClass = `block-nest-gallery-type-${layout} block-nest-gallery-col-${columns} block-nest-gallery-gutter-${spacing}`;
	const blockProps = useBlockProps({
		className: customClass
	});
	const galleryStyle = {
		'--bn--gallery--layout': `${layout}`,
		'--bn--gallery--col': `${columns}`,
		'--bn--gallery--gutter': `${spacing}px`,
	}

	return (

		<div { ...blockProps } style={ galleryStyle }>

			<InspectorControls>
				<PanelBody title={__( "Gallery Settings", "block-nest" )} initialOpen={true}>
					<SelectControl
                        label={__( "Layouts", "block-nest" )}
                        value={layout}
                        options={[
                            { label: __( "Grid Layout", "block-nest" ), value: "grid" },
                            { label: __( "Masonry Layout", "block-nest" ), value: "masonry" }
                        ]}
                        onChange={(value) => setAttributes({ layout: value })}
						help={__( "Choose how images should be displayed.", "block-nest" )}
                    />
					<hr />
					<RangeControl
						label={__( "Columns", "block-nest" )}
						value={columns}
						onChange={(value) => setAttributes({ columns: value })}
						min={1}
						max={8}
						allowReset={true}
						resetFallbackValue={3}
						help={__( "Set the number of columns for the gallery.", "block-nest" )}
					/>
					<hr />
					<RangeControl
						label={__( "Image Gap (px)", "block-nest" )}
						value={spacing}
						onChange={(value) => setAttributes({ spacing: value })}
						min={0}
						max={100}
						allowReset={true}
						resetFallbackValue={10}
						help={__( "Set the spacing between images in the gallery.", "block-nest" )}
					/>
					<hr />
					<ToggleControl
						label={__( "Enable Lightbox", "block-nest" )}
						checked={enableLightbox}
						onChange={(value) => setAttributes({ enableLightbox: value })}
						help={__( "Enable or disable the lightbox feature for the gallery.", "block-nest" )}
					/>
				</PanelBody>
			</InspectorControls>

			{ images && images.length > 0 && (
				<Fragment>
					<BlockControls>
						<ToolbarGroup>
							<ToolbarItem>
								{() => (
									<MediaUploadCheck>
										<MediaUpload
											value={images.map((img) => img.id)}
											onSelect={(images) => setAttributes({ images })}
											allowedTypes={['image']}
											multiple
											gallery
											addToGallery
											render={({ open }) => (
												<ToolbarButton
													className="components-toolbar__control"
													label={__( "Edit gallery", "block-nest" )}
													icon="edit"
													onClick={open}
												/>
											)}
										/>
									</MediaUploadCheck>

								)}
							</ToolbarItem>
						</ToolbarGroup>
					</BlockControls>
				</Fragment>
			)}

			{images?.length === 0 ? (
				<MediaPlaceholder
					onSelect={(images) => setAttributes({ images })}
					accept="image/*"
					allowedTypes={["image"]}
					multiple
					gallery
					labels={{
						title: __( "Gallery Images", "block-nest" ),
						instructions:
							__( "Drag images files, upload or select files from your library.", "block-nest" ),
					}}
				/>
			) : (
			<>
				{images.map((image, index) => (
					<div className={`gallery-item`} key={index}>
						<img 
							src={image.url}
							alt={image.alt}
							key={index}
						/>
					</div>
				))}
			</>
		)}

		</div>

	);
}
