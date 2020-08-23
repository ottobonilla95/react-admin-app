import { createBrowserHistory } from 'history';
import AppConfig from '../constants/AppConfig';

export default createBrowserHistory({
    // prod
    basename: AppConfig.publicUrl
});