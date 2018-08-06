import React from 'react'

interface IProps{
  load: any;
  children: any;
}


export default class Bundle extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      mod: null
    }
  }

  public componentWillMount() {
    this.load(this.props)
  }

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.load !== this.props.load) {
      this.load(this.props)
    }
  }

  public load(props: IProps) {
    this.setState({
      mod: null
    })
    props.load().then((mod: any) => {
      this.setState({
        mod: mod.default ? mod.default : mod
      });
    });
  }

  public render() {
    return this.state.mod ? this.props.children(this.state.mod) : null
  }
}