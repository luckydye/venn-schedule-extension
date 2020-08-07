import React from 'react'

import './App.css'

const timeZoneMap = {
    '-2': ""
}

export default class App extends React.Component {
    constructor(props) {
        super(props)

        //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null. 
        this.twitch = window.Twitch ? window.Twitch.ext : null
        this.state = {
            theme: 'light',
            isVisible: true,
            activeTab: 0,
            program: []
        }
    }

    contextUpdate(context, delta) {
        if (delta.includes('theme')) {
            this.setState(() => {
                return { theme: context.theme }
            })
        }
    }

    visibilityChanged(isVisible) {
        this.setState(() => {
            return {
                isVisible
            }
        })
    }

    componentDidMount() {
        this.setProgram([
            {
                length: 1,
                time: "December 17, 1995 11:00:00-08:00",
                name: "The Download",
            },
            {
                length: 2,
                time: "December 17, 1995 13:00:00-08:00",
                name: "Guest House",
            },
            {
                length: 1,
                time: "December 17, 1995 15:00:00-08:00",
                name: "VENN Arcade Live",
            },
            {
                length: 1,
                time: "December 17, 1995 19:00:00-08:00",
                name: "Looking for Gains",
            },
        ]);
    }

    setProgram(program) {
        this.setState(() => ({ program }));
    }

    switchTab(tabIndex) {
        this.setState(() => ({
            activeTab: tabIndex
        }));
    }

    render() {
        const placeholderData = {
            days: [
                "Thursday",
                "Friday",
                "Saturday",
            ],
            program: this.state.program
        }

        if (this.state.isVisible) {
            return (
                <div className="App">

                    <div className="navigation">
                        <div className="navigation-item" 
                            onClick={() => this.switchTab(0)}
                            active={this.state.activeTab == 0 ? "true" : "false"}>Thursday</div>

                        <div className="navigation-item" 
                            onClick={() => this.switchTab(1)}
                            active={this.state.activeTab == 1 ? "true" : "false"}>Friday</div>

                        <div className="navigation-item" 
                            onClick={() => this.switchTab(2)}
                            active={this.state.activeTab == 2 ? "true" : "false"}>Saturday</div>

                    </div>

                    <div className="program-list-header">
                        <div className="program-time">TIME</div>
                        <div className="program-time">PST</div>
                    </div>

                    <div className="program-list">
                        {placeholderData.program.map((program, i) => {

                            const time = new Date(program.time);

                            const pst = time.toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles" });

                            const pstTimeParts = pst.split(":");
                            const pstTimeString = `${pstTimeParts[0]}${pst.split(" ")[1][0]}`;

                            const utc = time.toLocaleTimeString("en-US");

                            const timeParts = utc.split(":");
                            const timeString = `${timeParts[0]}${utc.split(" ")[1][0]}`;

                            return (
                                <div className="program-entry" key={i} style={({
                                    '--length': program.length
                                })}>
                                    <div className="program-time">{timeString}</div>
                                    <div className="program-time">{pstTimeString}</div>
                                    <div className="program-title">{program.name}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="App">
                </div>
            )
        }

    }
}