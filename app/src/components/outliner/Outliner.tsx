import React, { Component } from "react";
import MenuBarSecondary from "../common/MenuBarSecondary";
import { outlineMenu } from "./OutlineMenu";
import OutlinerElement from "./OutlinerElement";
import OutlinerController from "./OutlinerController";
import { MatGraph } from "../../redux/types";
import { connect } from "react-redux";
import { Store } from "./../../redux/reducers/index";
import {
  changeActiveGraph,
  addNewGraph,
  removeGraph,
  setActiveGraphTitle
} from "../../redux/actions/ProjectActions";
import Cache from "../node_engine/cache";

interface OutlinerProps {
  graphs: MatGraph[];
  dimensions?: any;
  activeGraph: string;
  changeActiveGraph: (uuid: string) => void;
  addNewGraph: () => void;
  removeGraph: (uuid: string) => void;
  setMaterialGraphTitle: (key: string, value: string) => void;
}

interface OutlinerState {
  edit: boolean;
  isHoverActive: boolean;
}

class Outliner extends Component<OutlinerProps, OutlinerState> {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      isHoverActive: false
    };
  }

  renderOutliner = (outliners: MatGraph[]) => {
    return outliners.map((outliner, index) => {
      return (
        <OutlinerElement
          id={outliner.uuid}
          key={index}
          title={outliner.title}
          type={outliner.type}
          share={outliner.share}
          web={outliner.web}
          active={outliner.uuid === this.props.activeGraph}
          onClick={() => {
            this.props.changeActiveGraph(outliner.uuid);
            // Cache.removeAllCache();
          }}
          onDoubleClick={() => this.setState({ edit: true })}
          setOnHover={isHoverActive => this.setState({ isHoverActive })}
          edit={outliner.uuid === this.props.activeGraph && this.state.edit}
          setMaterialGraphTitle={(key, value) =>
            this.props.setMaterialGraphTitle(key, value)
          }
          submitEdit={() => this.setState({ edit: false })}
        />
      );
    });
  };

  checkIsAGraphSelected = () => {
    let isSelected = false;

    this.props.graphs.forEach(ele => {
      if (ele.uuid === this.props.activeGraph) {
        isSelected = true;
      }
    });

    return isSelected;
  };

  handleClickOutside = event => {
    if (!this.state.isHoverActive) {
      this.setState({ edit: false });
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    return (
      <div
        style={{
          overflow: "hidden",
          height: this.props.dimensions.height
        }}
      >
        <MenuBarSecondary menu={outlineMenu} index={300} />
        <div
          style={{
            position: "relative",
            backgroundColor: "red",
            width: "100%",
            height: 3
          }}
        >
          <OutlinerController
            addNewGraph={this.props.addNewGraph}
            removeGraph={() => this.props.removeGraph(this.props.activeGraph)}
            setEdit={() => this.setState({ edit: true })}
            selected={this.checkIsAGraphSelected()}
          />
        </div>
        <div
          style={{
            overflowY: "auto",
            height:
              typeof this.props.dimensions.height === "number"
                ? this.props.dimensions.height - 60
                : undefined,
            marginTop: 35,
            paddingBottom: 60
          }}
        >
          {this.renderOutliner(this.props.graphs)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    graphs: state.project.graphs,
    activeGraph: state.project.activeGraph
  };
};

const mapDispatchToProps = {
  changeActiveGraph,
  addNewGraph,
  removeGraph,
  setMaterialGraphTitle: setActiveGraphTitle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Outliner);
