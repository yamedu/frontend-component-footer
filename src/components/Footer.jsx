import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { ensureConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';

import messages from './Footer.messages';
import LanguageSelector from './LanguageSelector';

ensureConfig([
  'LMS_BASE_URL',
  'LOGO_TRADEMARK_URL',
], 'Footer component');

const EVENT_NAMES = {
  FOOTER_LINK: 'edx.bi.footer.link',
};

class SiteFooter extends React.Component {
  constructor(props) {
    super(props);
    this.externalLinkClickHandler = this.externalLinkClickHandler.bind(this);
  }

  externalLinkClickHandler(event) {
    const label = event.currentTarget.getAttribute('href');
    const eventName = EVENT_NAMES.FOOTER_LINK;
    const properties = {
      category: 'outbound_link',
      label,
    };
    sendTrackEvent(eventName, properties);
  }

  render() {
    const {
      supportedLanguages,
      onLanguageSelected,
      logo,
      intl,
    } = this.props;
    const showLanguageSelector = supportedLanguages.length > 0 && onLanguageSelected;
    const { config } = this.context;

    return (
       <footer className="footer">
	   <div className="footer-logo-container">
  		<div className="footer-logo">
    		  <a href={config.LMS_BASE_URL} className="footer-logo-link">
      		  <img
      			src={logo || config.LOGO_TRADEMARK_URL}
        		alt="footer-logo-img"
        		className="footer-img-logo"
      		  />
    		 </a>
  		</div>
  		<span className="copyrights">
    		  <p>© Copyright © 2024 Yam Education, Inc. All Rights Reserved.</p>
  		</span>
	  </div>
	  <div className="footer-links">
  		<li className="footer-nav-link">
    			<a href="https://yam-edu.com/privacy"> Privacy | Policy </a>
  		</li>
  		<li className="footer-nav-link">
    			<a href="https://yam-edu.com/terms"> Terms & Conditions</a>
  		</li>
	  </div>
	</footer>
    );
  }
}

SiteFooter.contextType = AppContext;

SiteFooter.propTypes = {
  intl: intlShape.isRequired,
  logo: PropTypes.string,
  onLanguageSelected: PropTypes.func,
  supportedLanguages: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
};

SiteFooter.defaultProps = {
  logo: undefined,
  onLanguageSelected: undefined,
  supportedLanguages: [],
};

export default injectIntl(SiteFooter);
export { EVENT_NAMES };
