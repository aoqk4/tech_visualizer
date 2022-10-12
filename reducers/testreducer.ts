import {
  action,
  ActionType,
  createAction,
  createReducer,
} from "typesafe-actions";

// 상태의 타입 선언
interface TestReducer {
  email?: String;
  password?: String;
  name?: String;
}

// 상태 초기화
const initialState: TestReducer = {
  email: "",
  password: "",
  name: "",
};

// 액션타입 선언
export const SIGN_UP_REQUEST = "testReducer/SIGN_UP_REQUEST";
export const LOGIN_CHECK = "testReducer/LOGIN_CHECK";
export const SIGN_IN_FAIL = "testReducer/SIGN_UP_REQUEST";

// 액션함수 선언
export const signUpRequest = createAction(SIGN_UP_REQUEST)<TestReducer>();
export const logInCheck = createAction(LOGIN_CHECK)<TestReducer>();
export const signInFail = createAction(SIGN_IN_FAIL)<TestReducer>();

// 액션 객체타입 선언
export const actions = { signUpRequest, logInCheck };
type TestReducerActions = ActionType<typeof actions>;

// 리듀서 추가
const testReducer = createReducer<TestReducer, TestReducerActions>(
  initialState,
  {
    [SIGN_UP_REQUEST]: (state, action) => ({
      email: action.payload.email,
      password: action.payload.password,
      name: action.payload.name,
    }),
    [LOGIN_CHECK]: (state, action) => {
      console.log(state);
      return state;
    },
  }
);

export default testReducer;
