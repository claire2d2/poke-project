const Footer = () => {
  return (
    <footer className="flex justify-between px-5 py-3 border-t border-blue-900">
      <a
        href="https://github.com/claire2d2/poke-project"
        className="text-blue-900 hover:text-orange-600"
      >
        https://github.com/claire2d2/poke-project
      </a>
      <div className="flex gap-5">
        <a
          href="https://www.linkedin.com/in/claireyuansong/"
          target="_blank"
          className="text-blue-900 hover:text-orange-600 font-medium"
        >
          Claire Song
        </a>
        <a
          href="https://www.linkedin.com/in/ivanpstoyanov/"
          target="_blank"
          className="text-blue-800 hover:text-orange-600 font-medium"
        >
          Ivan Stoyanov
        </a>
        <a
          href="https://www.linkedin.com/in/simonraphael/"
          target="_blank"
          className="text-blue-800 hover:text-orange-600 font-medium"
        >
          Raphaël Simon
        </a>
      </div>
    </footer>
  );
};

export default Footer;
