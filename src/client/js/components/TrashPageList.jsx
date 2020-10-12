import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { withUnstatedContainers } from './UnstatedUtils';

import AppContainer from '../services/AppContainer';
import PageContainer from '../services/PageContainer';


const TrashPageList = () => {
  return (
    <div>
      Trash page listttt
    </div>
  );
};

const TrashPageListWrapper = withUnstatedContainers(TrashPageList, [AppContainer, PageContainer]);


TrashPageList.propTypes = {
  t: PropTypes.func.isRequired, //  i18next
  appContainer: PropTypes.instanceOf(AppContainer),
  pageContainer: PropTypes.instanceOf(PageContainer),
};

export default withTranslation()(TrashPageListWrapper);
