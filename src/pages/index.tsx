import { Provider } from "react-redux";
import InputField from "../components/InputField";
import React, { FC } from "react";
import DisplayMap from "../components/DisplayMap";
import DisplayGlobe from "../components/DisplayGlobe";
import DisplayContent from "../components/DisplayContent";
import store from "../redux/store/store";

const App: FC = () => {
  return (
    <Provider store={store}>
      <div>
        <div>
          <div>
            <InputField />
            <DisplayContent />
          </div>

          <div>
            <DisplayMap />
            <DisplayGlobe />
          </div>
        </div>
      </div>
      );
    </Provider>
  );
};

export default App;
