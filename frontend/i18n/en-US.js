import ppEn from './privacyPolicy/en';

export default {
  index: {
    header: {
      title: 'Your wish is someones pleasure',
      description: `
        List your public amazon wishlist for others to donate,
        or browse all the registered lists and make donations yourself.
      `,
      button: 'Get started',
    },
    steps: {
      title: 'Get started in less than five minutes',
      description: `
        Follow the steps below and you'll be
        ready to publish your very own list
        in not even five minutes.
      `,
      one: {
        title: 'Grab your wishlist',
        description: {
          text: `
            Head over to amazon and create a public wishlist (in case you
            haven't already).
          `,
          hint: `
            If you don't want to make your name and address visible to your
            donor, make sure to tick the proper checkboxes!
          `,
        },
      },
      two: {
        title: 'Login into our website',
        description: `
          We use google sign-in to make it fast and secure for you. The only
          things we ask you for are access to your name and email address
          from your google account to identify you on recurring logins.
        `,
      },
      three: {
        title: 'Create your listing',
        description: `
          Create a new listing with the shareable link you got from
          amazon. You can list up to 3 individual wishlists on your account.
        `,
      },
      four: {
        title: 'Done',
        description: `
          Once you've created your listing it will be published on our site so
          that other generous people can donate your items to you.
        `,
      },
    },
    stats: {
      title: 'Some stats for you',
      description: `
        If you still have doubts about how this could help you,
        maybe the numbers below can help you with your decision
      `,
      wishlists: 'Currently listed wishlists',
      users: 'Currently signed up users',
    },
  },
  about: {
    link: 'About',
  },
  howTo: {
    link: 'How To',
  },
  faq: {
    link: 'FAQ',
    title: 'Frequently asked questions',
  },
  signIn: {
    link: 'Sign In',
    infoText:
      'Signing in with google will only grant us access to your public profile and email.',
  },
  privacyPolicy: {
    link: 'Privacy Policy',
    sections: ppEn,
  },
  search: {
    link: 'Browse Lists',
    card: {
      link: 'Go to Wishlist',
    },
    loadMoreButton: 'Load More',
    category: {
      filter: 'Filter',
      apply: 'Apply',
      reset: 'Reset',
    },
  },
  profile: {
    link: 'Profile',
  },
  navbarTitle: 'Your wish is someones pleasure',
  footer: {
    descriptionPartOne: `
      Your wish is someones pleasuer. This is what's driving this page.
      The urge to help people who are either in a financially bad
      situation, or just can't afford an item right now.
    `,
    descriptionPartTwo: `
      By donating wishlist items, you'll help out a buddy in needs and
      make yourself smile.
    `,
    links: {
      header: 'Useful links',
    },
    copyright: 'All rights reserved.',
  },
  cookieBanner: {
    start: 'Can I use cookies for analytics? Read',
    link: 'the privacy policy',
    end: 'for more information.',
    yes: 'Yes, Sure',
    no: 'Decline',
  },
  404: {
    headline: 'Oops. This page has gone missing.',
    info: 'You may have mistyped the address or the page may have moved.',
    button: 'Go Home',
  },
  500: {
    headline: 'Network Error.',
    infoOne: 'Seems like something bricked...',
    infoTwo:
      'One of our developers will get his coffe removed until this is fixed.',
    button: 'Great, take me home.',
  },
};
