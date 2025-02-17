import { MetaType } from "./MetaTypes";

export type PageResponseType = {
    data: PageType;
    meta: MetaType;
}
export type PageType = {
    id: number;
    attributes: PageAttributesType;
}

export type PageAttributesType = {
    createdAt: Date;
    publishedAt: Date;
    slug: string;
    title: string;
    updatedAt: Date;
    seo: SeoType;
}

export type SeoType = {
    id: number;
    seoDescription: string;
    seoTitle: string;
    seoKeywords: string;

}