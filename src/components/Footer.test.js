import React from "react";
import { shallow, mount, render } from "enzyme";
import "../setupEnzymeTests";
import Footer from "./Footer";

describe("<Footer />", () => {
  it("renders one <footer>", () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find("footer")).toHaveLength(1);
  });
  it("renders three <li>", () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find("li")).toHaveLength(5);
  });
});
