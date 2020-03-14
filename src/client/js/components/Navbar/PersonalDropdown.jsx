import React from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from 'react-i18next';

import { createSubscribedElement } from '../UnstatedUtils';
import AppContainer from '../../services/AppContainer';

import UserPicture from '../User/UserPicture';

const PersonalDropdown = (props) => {

  const { t, appContainer } = props;
  const user = appContainer.currentUser || {};

  const logoutHandler = () => {
    const { interceptorManager } = appContainer;

    const context = {
      user,
      currentPagePath: decodeURIComponent(window.location.pathname),
    };
    interceptorManager.process('logout', context);

    window.location.href = '/logout';
  };

  return (
    <>
      {/* Button */}
      <a className="nav-link dropdown-toggle waves-effect waves-light" data-toggle="dropdown">
        <UserPicture user={user} withoutLink />&nbsp;{user.name}
      </a>

      {/* Menu */}
      <div className="dropdown-menu dropdown-menu-right">

        <a className="dropdown-item" href={`/user/${user.username}`}><i className="icon-fw icon-user"></i>{ t('User\'s Home') }</a>
        <a className="dropdown-item" href="/me"><i className="icon-fw icon-wrench"></i>{ t('User Settings') }</a>

        <div className="dropdown-divider"></div>

        <a className="dropdown-item" href={`/user/${user.username}#user-draft-list`}><i className="icon-fw icon-docs"></i>{ t('List Drafts') }</a>
        <a className="dropdown-item" href="/trash"><i className="icon-fw icon-trash"></i>{ t('Deleted Pages') }</a>

        <div className="dropdown-divider"></div>

        <h6 className="dropdown-header">Switching Mode</h6>
        <form className="px-4 form-inline">
          Light
          <div className="custom-control custom-switch custom-checkbox-secondary ml-2">
            <input
              id="isDarkMode"
              className="custom-control-input"
              type="checkbox"
              checked={appContainer.state.isDarkMode}
              onChange={(e) => {
                appContainer.changeColorScheme(e.target.checked);
              }}
            />
            <label className="custom-control-label" htmlFor="isDarkMode"></label>
          </div>
          Dark
        </form>

        <div className="dropdown-divider"></div>

        <a className="dropdown-item" type="button" onClick={logoutHandler}><i className="icon-fw icon-power"></i>{ t('Sign out') }</a>
      </div>

    </>
  );

};

/**
 * Wrapper component for using unstated
 */
const PersonalDropdownWrapper = (props) => {
  return createSubscribedElement(PersonalDropdown, props, [AppContainer]);
};


PersonalDropdown.propTypes = {
  t: PropTypes.func.isRequired, //  i18next
  appContainer: PropTypes.instanceOf(AppContainer).isRequired,
};

export default withTranslation()(PersonalDropdownWrapper);
