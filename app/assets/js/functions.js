(function() {

	var basic, pageFunc, plugin;

	window.onload = function () {
		pageFunc.test();  //测试组件
	};


	pageFunc = {

		// 测试组件
		test: function () {
			var TestComponent = React.createClass({
				render: function() {
					return <p className={this.props.class1}>the content is: {this.props.sth} + {this.props.sth2}</p>;
				}
			});
			ReactDOM.render(
				<TestComponent class1="testClass" sth="nothing" sth2="nothing2" />,
				document.getElementById('example')
			);
		}

	}



}).call(this);