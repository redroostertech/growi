import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

const PageTabs = (props) => {
  const { t } = props;

  return (
    <>
      {/* if page */}
      <ul className="nav nav-tabs d-print-none d-none" role="tablist">
        {/* left tab */}
        <li className="nav-item grw-main-nav-item-left">
          <a className="nav-link active" href="#revision-body" role="tab" data-toggle="tab">
            <i className="icon-control-play icon-fw"></i><span className="d-none d-md-inline">View</span>
          </a>
        </li>
        {/* if is not trash page */}{/* if user */}
        <li className="nav-item grw-main-nav-item-left grw-nav-item-edit">
          <a href="#edit" data-toggle="tab" className="nav-link edit-button">
            <i className="icon-note icon-fw"></i><span className="d-none d-md-inline">{ t('Edit') }</span>
          </a>
        </li>
        {/* if is not trash page */}{/* if not user */}
        <li className="nav-item grw-main-nav-item-left grw-nav-item-edit">
          <a
            className="nav-link edit-button edit-button-disabled"
            data-toggle="tooltip"
            data-placement="top"
            data-container="body"
            title={t('Not available for guest')}
          >
            <i className="icon-note icon-fw"></i><span className="d-none d-md-inline">{ t('Edit') }</span>
          </a>
        </li>
        {/* isHackmdSetup() */}{/* if user */}
        <li className="nav-item grw-main-nav-item-left grw-nav-tab-hackmd">
          <a
            href="#hackmd"
            data-toggle="tab"
            className="nav-link edit-button"
          >
            <i className="fa fa-fw fa-file-text-o"></i><span className="d-none d-md-inline">{ t('HackMD') }</span>
          </a>
        </li>
        {/* isHackmdSetup() */}{/* if not user */}
        <li className="nav-item grw-main-nav-item-left grw-nav-tab-hackmd">
          <a
            className="nav-link edit-button edit-button-disabled"
            data-toggle="tooltip"
            data-placement="top"
            data-container="body"
            title={t('Not available for guest')}
          >
            <i className="fa fa-fw fa-file-text-o"></i><span className="d-none d-md-inline">{ t('HackMD') }</span>
          </a>
        </li>
        {/* <div id="page-editor-path-nav" className="d-none d-edit-sm-block ml-2"></div> */}

        {/* right tabs */}

        {/* to place right side */}
        <div className="mr-auto"></div>

        {/* presentation */}
        {/* if not page is top page */}
        <li className="nav-item d-edit-none">
          <a href="?presentation=1" className="nav-link toggle-presentation">
            <i className="icon-film icon-fw"></i><span className="d-none d-sm-inline">{ t('Presentation Mode') }</span>
          </a>
        </li>

        {/* revision-history */}
        <li className="nav-item d-edit-none">
          <a className="nav-link" href="#revision-history" role="tab" data-toggle="tab">
            <i className="icon-layers icon-fw"></i><span className="d-none d-md-inline">{ t('History') }</span>
          </a>
        </li>

        {/* Outside-share-link */}
        {/* is not trash page */}
        <li id="page-share-management" className="nav-item dropdown d-edit-none"></li>

        {/* icon-options-versical */}
        {/* if is not trash page */}
        <li id="page-management" className="nav-item dropdown d-edit-none"></li>
      </ul>
    </>
  );

};

PageTabs.propTypes = {
  t: PropTypes.func.isRequired, //  i18next
};

export default withTranslation()(PageTabs);
