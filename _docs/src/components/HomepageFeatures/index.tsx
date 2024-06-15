import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to use, color optional',
    Svg: require('@site/static/img/feature-easy.svg').default,
    description: (
      <>
        Support multi-level console and file logging out of the box, with minimal setup.
      </>
    ),
  },
  {
    title: 'Localized time and date',
    Svg: require('@site/static/img/feature-international.svg').default,
    description: (
      <>
        KindLogs can be set to any <a href='https://www.techonthenet.com/js/language_tags.php'>BCP 47 locale</a> and <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">time zone</a> in order to localize date and time formats used in timestamps.
      </>
    ),
  },
  {
    title: 'Syslog-standard levels',
    Svg: require('@site/static/img/feature-syslog.svg').default,
    description: (
      <>
        KindLogs uses Syslog-standard numeric levels <code>0-7</code> for deriving error levels, separating log-level from console method. 
      </>
    ),
  },
  // {
  //   title: 'Optional color',
  //   Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
  //   description: (
  //     <>
  //       Enable color by simply installing <code>ansis</code> and enabling the <code>color</code> option.
  //     </>
  //   ),
  // },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
