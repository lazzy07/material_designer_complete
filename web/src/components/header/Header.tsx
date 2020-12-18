import React, { Component } from "react";
import { SECONDARY_COLOR, ACTIVE_COLOR_LIGHT } from "../../constants";
import { RouteElement, routes } from "../../routes/routes";
import { connect } from "react-redux";
import { Store } from "./../../redux/reducers/index";
import { Icon } from "react-materialize";
import { setRoute } from "../../redux/actions/RouteActions";
import { withRouter } from "react-router";
import Avatar from "./Avatar";
import { getText } from "../../text/LanguageSelector";
import { headerText } from "../../text/Header";

interface HeaderProps {
  isLoggedIn: boolean;
  currentRoute: string;
  setRoute: (route: string) => void;
}

class Header extends Component<any, any> {
  navigate = (route: string) => {
    this.props.setRoute(route);
    (this.props as any).history.push(route);
  };

  getAccesableRoutes = (
    isLoggedIn: boolean | undefined,
    routes: RouteElement[]
  ) => {
    let accessableRoutes: RouteElement[] = [];
    if (isLoggedIn) {
      return (accessableRoutes = [...routes]);
    } else {
      routes.forEach(element => {
        if (!element.login) {
          accessableRoutes.push(element);
        }
      });

      return accessableRoutes;
    }
  };

  renderNavigatorsPc = (routes: RouteElement[]) => {
    let rts = this.getAccesableRoutes(this.props.isLoggedIn, routes);
    return rts.map((ele, index) => {
      return (
        <div
          key={index}
          onClick={() => this.navigate(ele.route)}
          style={{
            paddingRight: 5,
            paddingLeft: 5,
            marginRight: 10,
            fontSize: 18,
            fontWeight: "bolder",
            cursor: "pointer",
            color:
              this.props.currentRoute === ele.route
                ? ACTIVE_COLOR_LIGHT
                : undefined
          }}
        >
          {ele.title}
        </div>
      );
    });
  };

  renderNavigatorsMobile = (routes: RouteElement[]) => {
    let rts = this.getAccesableRoutes(this.props.isLoggedIn, routes);

    return rts.map((ele, index) => {
      return (
        <div
          key={index}
          onClick={() => this.navigate(ele.route)}
          style={{
            cursor: "pointer",
            paddingRight: 5,
            paddingLeft: 5,
            marginRight: 10,
            fontSize: 18,
            color:
              this.props.currentRoute === ele.route
                ? ACTIVE_COLOR_LIGHT
                : undefined
          }}
        >
          <Icon>{ele.icon}</Icon>
        </div>
      );
    });
  };

  componentWillMount() {
    let path = this.props.location.pathname.split("/");
    this.props.setRoute("/" + path[1]);
  }

  render() {
    return (
      <div
        style={{
          height: "50px",
          width: "100vw",
          position: "fixed",
          top: 0,
          zIndex: 1000,
          backgroundColor: SECONDARY_COLOR
        }}
      >
        <div
          className="hide-on-small-only"
          style={{
            fontSize: "20px",
            fontWeight: "bolder",
            paddingLeft: 10,
            paddingTop: 10
          }}
        >
          {getText(headerText.title)}
        </div>
        <div style={{ position: "fixed", top: 10, right: 10, display: "flex" }}>
          <div className="hide-on-small-only">
            <div style={{ display: "flex" }}>
              {this.renderNavigatorsPc(routes)}
            </div>
          </div>
          <div className="hide-on-med-and-up" style={{ display: "flex" }}>
            <div style={{ display: "flex" }}>
              {this.renderNavigatorsMobile(routes)}
            </div>
          </div>
          <Avatar
            currentRoute={this.props.currentRoute}
            isLoggedIn={this.props.isLoggedIn}
            navigate={(route: string) => this.navigate(route)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    isLoggedIn: state.user.sessionId.length > 0 ? true : false,
    currentRoute: state.route.currentRoute
  };
};

const mapActionsToProps = {
  setRoute
};

export default connect(mapStateToProps, mapActionsToProps)(withRouter(Header));
