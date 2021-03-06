import { Component, Event, EventEmitter, Prop, h } from "@stencil/core";

@Component({
  tag: "dt-demo-modal",
  styleUrl: "demo-modal.scss",
  shadow: true
})
export class DemoModal {
  @Event() nextItem: EventEmitter;
  @Event() reloadApplicationEvent: EventEmitter;
  @Prop() demoItemNumber: number;

  nextDemoItem() {
    if (this.demoItemNumber !== 8) {
      this.nextItem.emit();
    } else {
      this.reloadApplication();
    }
  }

  reloadApplication() {
    this.reloadApplicationEvent.emit();
  }

  render() {
    return [
      <div>
        <div class="col-left">
          <p>Welcome to the DS OBJECT!</p>
        </div>
        <div class="col-right">
          <gxg-button
            type="outlined"
            onClick={this.reloadApplication.bind(this)}
          >
            End demo
          </gxg-button>
          <gxg-button
            type="primary-text-only"
            onClick={this.nextDemoItem.bind(this)}
          >
            {this.demoItemNumber !== 8 ? "Next" : "Finish"}
          </gxg-button>
        </div>
      </div>
    ];
  }
}
