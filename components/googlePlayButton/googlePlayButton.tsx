import Image from 'next/image';
import Link, { LinkProps } from 'next/link';
import badgeImage from '@/assets/images/google-play-badge.png';

type GooglePlayButtonProps = Omit<LinkProps, 'href'> & { className?: string };

export function GooglePlayButton(props: GooglePlayButtonProps) {
  const { ...restProps } = props;

  return (
    <Link
      {...restProps}
      target="_blank"
      href="https://play.google.com/store/apps/details?id=com.danilkinkin.buckwheat&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
    >
      <Image
        alt="Get it on Google Play"
        src={badgeImage}
        height={undefined}
        width={130}
      />
    </Link>
  );
}
