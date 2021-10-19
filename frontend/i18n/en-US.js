import ppEn from './privacyPolicy/en';
import faqEn from './faq/en';

export default {
  index: {
    meta: {
      content:
        "Share your amazon wishlist to get donations, or browse others' lists and donate.",
    },
    header: {
      title: 'Your wish is someones pleasure',
      description:
        "Share your amazon wishlist to get donations, or browse others' lists and donate.",
      button: 'Get started',
    },
    steps: {
      title: 'Get started in less less than 5 minutes',
      description: '',
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
        title: 'Login to our website',
        description: `
          We use google sign-in to make it fast and secure for you. The only
          things we ask you for are access to your profile and email address
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
    meta: {
      content:
        'How buystuff4.me came to life nad why we chose amazon wishlists.',
    },
    link: 'About',
    project: {
      header: 'The Project',
      items: [
        'This project originated out of sheer curiosity. I was setting up a private wishlist for myself and thought about looking up a way to make it public just for giggles.',
        'Soon I noticed that no such site exists. Nothing where you can actively share your wishlist with others (somewhat understandable since not everyone is willing to donate to strangers).',
        'After some research I noticed that amazon had this feature in the past but they removed it for whatever reason. So I made it my personal task to bring such a site to life.',
        'I hope that with the help of buystuff4.me, many people out there can get a little bit of support in their daily business of struggling to live through the day.',
      ],
    },
    teamHeader: 'The team',
    marco: {
      name: 'Marco Schuster',
      position: 'Fullstack Developer',
      bio: '',
    },
    damjan: {
      name: 'Damjan Petrovic',
      position: 'Web Designer',
      bio: '',
    },
  },
  howTo: {
    meta: {
      content: '',
    },
    link: 'How To',
  },
  faq: {
    meta: {
      content:
        'Frequently asked questions about amazon wishlist publishing and bug reporting.',
    },
    link: 'FAQ',
    title: 'Frequently asked <span class="font-medium">Questions</span>',
    questions: faqEn,
  },
  signIn: {
    meta: {
      content:
        'Sign in to buystuff4.me to share your personal amazon wishlist.',
    },
    link: 'Sign In',
    infoText:
      'Signing in with google will only grant us access to your public profile and email.',
  },
  privacyPolicy: {
    meta: {
      content:
        'Privacy policy of buystuff4.me. Here you can find all the information about how we handle user data and cookies.',
    },
    link: 'Privacy Policy',
    sections: ppEn,
  },
  search: {
    meta: {
      content:
        'Public listed amazon wishlists. Look through all the listings or search for specific categories.',
    },
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
    header: 'Your Profile',
    wishListHeader: 'Your Wishlists',
    wishList: {
      label: 'Wishlist link',
      descriptionHeader: 'Your wishlist description:',
      create: {
        header: 'Create a new list',
        descriptionLabel: 'Add a description',
        categoryLabel: 'Choose your categories',
        saveButton: 'Save List',
      },
    },
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
  input: {
    urlError: "URL doesn't match pattern!",
    emptyError: 'No input given!',
  },
};
