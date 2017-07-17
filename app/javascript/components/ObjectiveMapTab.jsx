import React from 'react';
import ObjectiveMap from './ObjectiveMap';
import { Tab } from 'semantic-ui-react';

const ObjectiveMapTab = ({objectives}) => {
  return (
    <Tab.Pane attached={false} className='okr-map-tab'>
      {
        objectives.map(objective => {
          return <ObjectiveMap key={objective.get('id')} objective={objective}/>;
        })
      }
    </Tab.Pane>
  );
};

export default ObjectiveMapTab;
