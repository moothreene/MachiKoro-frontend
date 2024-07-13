import mixpanelInstance from 'mixpanel-browser';
mixpanelInstance.init('afb42e118f4421fce4bb353510ac0577', {debug: true, track_pageview: true, persistence: 'localStorage'});
export default mixpanelInstance;