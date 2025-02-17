import { SingleImageType } from "./ImageTypes";
import { MetaType } from "./MetaTypes";
import { SeoType } from "./PageType";

export type ArticleResponseType = {
    data: ArticleDataType;
    meta: MetaType;
}
export type ArticlesResponseType = {
    data: ArticleDataType[];
    meta: MetaType;
}

export type ArticleDataType = {
    id: number;
    attributes: ArticleAttributesType;
}
export type ArticleAttributesType = {
    title?: string;
    fullContent?: string;
    slug?: string;
    shortContent?: string;
    createdAt?: Date;
    updatedAt?: Date;
    publishedAt?: Date;
    image?: SingleImageType;
    seo?: SeoType;
}
