import React from 'react';
import PropTypes from 'prop-types';

import { withUnstatedContainers } from './UnstatedUtils';

import AppContainer from '../services/AppContainer';
import PageContainer from '../services/PageContainer';

// import PaginationWrapper from './PaginationWrapper';


const TrashPageList = (props) => {

  return (
    <div>This is Trash page</div>
  );
};

const PageListWrapper = withUnstatedContainers(TrashPageList, [AppContainer, PageContainer]);


TrashPageList.propTypes = {
  appContainer: PropTypes.instanceOf(AppContainer),
  pageContainer: PropTypes.instanceOf(PageContainer),
};

export default PageListWrapper;
