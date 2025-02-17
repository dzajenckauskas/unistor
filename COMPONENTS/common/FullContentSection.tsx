// import TextBanner from '@/COMPONENTS/common/sections/TextBanner';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DOMPurify from 'dompurify';
import parse, { Element, HTMLReactParserOptions } from 'html-react-parser';

// SSR-safe setup for DOMPurify
let purify;
if (typeof window === 'undefined') {
    const { JSDOM } = require('jsdom');
    const window = new JSDOM('').window;
    purify = DOMPurify(window); // SSR-compatible DOMPurify instance
} else {
    purify = DOMPurify;
}

type Props = {
    fullContent: string;
};

const FullContentSection = ({ fullContent }: Props) => {
    // Ensure safe purify usage

    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            try {
                if (domNode instanceof Element) {
                    if (domNode.tagName === 'div' && domNode.children.length > 0) {
                        const hasBannerChild = Array.from(domNode.children).some(
                            (child) =>
                                child instanceof Element &&
                                child.attribs?.class?.includes('banner')
                        );

                        if (hasBannerChild) {
                            return (
                                <Stack sx={{ width: '100%', position: 'relative' }}>
                                    {/* <TextBanner /> */}
                                </Stack>
                            );
                        }
                    }
                }
            } catch (error) {
                console.error('Error replacing element:', error);
                return <Typography>Error rendering this part of the content</Typography>;
            }
        },
    };


    purify.setConfig({
        ALLOWED_TAGS: [
            'iframe', 'div', 'p', 'span', 'a', 'b', 'i', 'strong', 'em', 'ul', 'ol', 'li',
            'br', 'hr', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'code',
            'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td'
        ],
        ALLOWED_ATTR: [
            'src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen',
            'style', 'class', 'alt', 'title', 'href', 'target', 'align', 'colspan', 'rowspan'
        ],
        ADD_ATTR: ['target'], // Custom attributes if needed
    });

    // Clean and parse the content
    const sanitizedContent = purify ? purify.sanitize(fullContent) : fullContent;
    let parsedContent;
    try {
        parsedContent = parse(sanitizedContent, options);
    } catch (error) {
        console.error('Parsing error:', error);
        parsedContent = <Typography>Error rendering content</Typography>;
    }

    return (
        <Stack sx={{ maxWidth: 'md' }}>
            <Typography component="div" className="dynamicContent">
                {parsedContent}
            </Typography>
        </Stack>
    );
};

export default FullContentSection;
