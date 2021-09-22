export default [
  {
    title: 'Can I change my credentials? (email/first name/last name)',
    body: `
        <p>
          Short answer: <span class="font-medium">UNFORTUNATELY NOT</span>
          <br />
          Long answer: Since we take that info from your google account
          and identify you with that it's not possible for you.
          <span class="font-medium">BUT</span> if you change your name on
          google it will automatically be reflected on your account here.
        </p>
      `,
  },
  {
    title: 'I want to add a new category, can I do that?',
    body: `
        <p>
          Our categories are taken from amazon directly. We looked up the
          top 20 categories there. If that list ever changes we'll update
          it on our platform as well.
        </p>
      `,
  },
  {
    title: "I created a list entry but it doesn't show up?",
    body: `
        <p>
          Most likely it got put into the publishing queue. We only
          publish 300 lists at a time for now to give everyone a fair
          chance to receive donations. The list gets automatically updated
          after 7 days through a scheduler. Once yours is on the to be
          published list, you'll see it after the next update.
        </p>
      `,
  },
  {
    title: 'How do I publish my listing again?',
    body: `
        <p>
          On your profile there's a button called
          <span class="font-medium">Add to publish queue</span>. This will
          put your list into the publish queue again. We do this to not
          clutter the queue with stale lists.
        </p>
      `,
  },
  {
    title: 'I found a bug / translation error, can I report that?',
    body: `
        <p>
          Yes please do so, we are always trying to improve our site for
          the best experience. Head over to our
          <a
            href="https://github.com/Enubia/buystuff4.me/issues/new"
            target="_blank"
            rel="canonical"
            class="link"
            >GitHub Page</a
          >
          and create a new issue. If possible provide a short description
          / screenshot on what's broken.
        </p>
      `,
  },
];
