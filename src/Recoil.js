import { atom } from 'recoil';

export const Pagenos = atom({
  key: 'pagenos',
  default: 0,
});

export const loadingStatus = atom({
  key: 'loadingStatus',
  default: false,
});
export const pinCodeStatus = atom({
  key: 'pinCodeStatus',
  default: false,
});
export const filterOrder = atom({
  key: 'filterOrder',
  default: null,
});

export const applyFilter = atom({
  key: 'applyFilter',
  default:false,
});

export const getSingleAccessId = atom({
  key: 'getSingleAccessId',
  default:null,
});

export const blogDescription = atom({
  key: 'blogDescription',
  default:"",
})