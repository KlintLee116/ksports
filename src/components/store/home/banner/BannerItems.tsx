import Image from "next/image";

const BannerProductsInfo:
    Map<number, string> = new Map([
        [2, 'https://ksports.s3.us-east-2.amazonaws.com/next-s3-uploads/477f0910-99b0-48c8-a4c1-85c835e1c13d/grailify-ju4-jsQ8jmk-unsplash.jpg'],
        [3, 'https://ksports.s3.us-east-2.amazonaws.com/next-s3-uploads/477f0910-99b0-48c8-a4c1-85c835e1c13d/usama-akram-kP6knT7tjn4-unsplash.jpg'],
        [8, 'https://ksports.s3.us-east-2.amazonaws.com/next-s3-uploads/477f0910-99b0-48c8-a4c1-85c835e1c13d/eddie-palmore-XwWGyrVidZE-unsplash.jpg']])

const BannerItems: JSX.Element[] = []


BannerProductsInfo.forEach(value => {
    BannerItems.push(<div className="flex items-center h-full w-[80%] mx-auto relative">
        <Image priority loading="eager" fill={true} alt="image" src={value} style={{objectFit:"contain"}}/>
    </div>)
})

export default BannerItems;