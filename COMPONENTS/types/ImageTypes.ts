export type ImagesType = {
    data?: ImageType[];
}
export type SingleImageType = {
    data?: ImageType;
}
export type ImageDataType = {
    data: ImageType
}

export type ImageType = {
    id: number;
    attributes?: ImageAttributesType;
}

export type ImageAttributesType = {
    alternativeText: string | null;
    caption: string | null;
    createdAt: Date;
    ext: string;
    formats: ImageFormatsType;
    hash: string;
    height: number;
    mime: string;
    name: string;
    path: string | null;
    previewUrl: string | null;
    provider: string;
    provider_metadata: null;
    size: number;
    updatedAt: string;
    url: string;
    width: number;
}

export type ImageFormatsType = {
    large: ImageAttributesType;
    small: ImageAttributesType;
    medium: ImageAttributesType;
    thumbnail: ImageAttributesType;

}
