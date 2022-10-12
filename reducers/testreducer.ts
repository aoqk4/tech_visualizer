import { ActionType, createAction, createReducer } from "typesafe-actions";

// 상태의 타입 선언
interface TestReducer {
  logined: Boolean;
}

// 상태 초기화
const initialState: TestReducer = {
  logined: false,
};

// 액션타입 선언
export const RESET_LOGIN = "testReducer/RESET_LOGIN";
export const ADD_LOGIN = "testReducer/ADD_LOGIN";

// 액션함수 선언
export const resetLogin = createAction(RESET_LOGIN)<TestReducer>();
export const addLogin = createAction(ADD_LOGIN)<TestReducer>();

// 액션 객체타입 선언
export const actions = { resetLogin, addLogin };
type TestReducerActions = ActionType<typeof actions>;

// 리듀서 추가
const testReducer = createReducer<TestReducer, TestReducerActions>(
  initialState,
  {
    [RESET_LOGIN]: () => ({
      logined: false,
    }),
    [ADD_LOGIN]: () => ({
      logined: true,
    }),
  }
);

export default testReducer;
