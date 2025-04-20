import React from 'react'

interface Param {
	id: number
	name: string
	type: 'string'
}

interface ParamValue {
	paramId: number
	value: string
}

interface Model {
	paramValues: ParamValue[]
	colors?: string[]
}

interface Props {
	params: Param[]
	model: Model
}

interface State {
	paramValues: { [key: number]: string }
}

class ParamEditor extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)

		const initialValues: { [key: number]: string } = {}
		props.model.paramValues.forEach(paramValue => {
			initialValues[paramValue.paramId] = paramValue.value
		})

		this.state = {
			paramValues: initialValues,
		}
	}

	// Метод для получения полной структуры модели
	public getModel(): Model {
		const paramValues: ParamValue[] = Object.entries(
			this.state.paramValues
		).map(([paramId, value]) => ({
			paramId: Number(paramId),
			value,
		}))

		return {
			paramValues,
			colors: this.props.model.colors,
		}
	}

	private handleChange = (paramId: number, value: string) => {
		this.setState(prevState => ({
			paramValues: {
				...prevState.paramValues,
				[paramId]: value,
			},
		}))
	}

	render() {
		return (
			<div>
				{this.props.params.map(param => (
					<div key={param.id}>
						<label>
							{param.name}:
							<input
								type='text'
								value={this.state.paramValues[param.id] || ''}
								onChange={e => this.handleChange(param.id, e.target.value)}
							/>
						</label>
					</div>
				))}
			</div>
		)
	}
}

const params: Param[] = [
	{ id: 1, name: 'Назначение', type: 'string' },
	{ id: 2, name: 'Длина', type: 'string' },
]

const model: Model = {
	paramValues: [
		{ paramId: 1, value: 'повседневное' },
		{ paramId: 2, value: 'макси' },
	],
}

const App = () => (
	<div>
		<h1>Редактор параметров</h1>
		<ParamEditor params={params} model={model} />
	</div>
)

export default App
