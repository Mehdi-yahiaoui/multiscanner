import Link from "next/link"
import Image from "next/image"
import {buildImage} from "@/lib/imageBuilder.sanity"
import tw from "twin.macro"


type CardProps = {
    title?: string;
    mainImage?: any;
    description?: string;
    publishedAt?: string;
    slug?: string;
}

export default function Card({ title, mainImage, description, publishedAt = String(new Date()), slug}: CardProps): JSX.Element {

    return (
        <section style={{ position:'relative'}} id={slug}  aria-label="blog post card" >
            <Image src={buildImage(mainImage.asset).width(400).height(300).url()} height="300" width="400" />

            <h2>{title}</h2>
            <section aria-label="description">
                <p>{description}</p>
            </section>
            <Link href={`/post/${slug}`}>
                <a tw="absolute right-0 top-0 bottom-0 left-0 cursor-pointer" />
            </Link>
        </section>
    )
}
