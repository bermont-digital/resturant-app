export { default as AddUserInputField } from '../../components/AddUserInputField.vue'

export const LazyAddUserInputField = import('../../components/AddUserInputField.vue' /* webpackChunkName: "components/AddUserInputField" */).then(c => c.default || c)
