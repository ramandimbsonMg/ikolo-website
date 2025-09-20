import Image, { StaticImageData } from 'next/image';
import React from 'react';
import GooglePlay from '@/assets/svgs/app/google-play.svg';

const PlayStore = ({ image }: { image?: StaticImageData }) => {
  return (
    <a
      href='https://play.google.com/store/apps/details?id=com.tfhmobile'
      target='_blank'
      rel='noreferrer'
    >
      <Image src={image || GooglePlay} alt='Google Play' />
    </a>
  );
};

export default PlayStore;
