/**
 * Created by maximedesogus on 28/04/2017.
 */
export interface OnError {
  isInError: boolean;
  errorMsg: string;

  displayErrorMsg(errorMsg: string);
  hideErrorMsg();
}