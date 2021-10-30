import Head from "next/head";
import { FC } from "react";
import { HeadProps } from "typings/meta";


export const DefaultMeta:FC<HeadProps> = ({children, title, ...rest}) => {
    const tags = [rest]
    return (
        <Head>
            {tags.map((tag, i) => {
                <meta
                    {...tag} key={i}
                />
            })}
            <meta charSet="utf-8" />
            <title>{title}</title>
            {children}
        </Head>
    )
}

