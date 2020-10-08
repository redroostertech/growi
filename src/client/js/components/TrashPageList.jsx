import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import PageListIcon from './Icons/PageListIcon';

import { withUnstatedContainers } from './UnstatedUtils';

import AppContainer from '../services/AppContainer';
import PageContainer from '../services/PageContainer';

// import PaginationWrapper from './PaginationWrapper';


const TrashPageList = (props) => {
  const { t } = props;

  return (
    <div>
      {t('page_list')}
      <PageListIcon />
    </div>
  );
};

const PageListWrapper = withUnstatedContainers(TrashPageList, [AppContainer, PageContainer]);


TrashPageList.propTypes = {
  t: PropTypes.func.isRequired, //  i18next
  appContainer: PropTypes.instanceOf(AppContainer),
  pageContainer: PropTypes.instanceOf(PageContainer),
};

export default withTranslation()(PageListWrapper);
