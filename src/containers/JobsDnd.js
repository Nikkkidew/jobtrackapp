import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// fake data generator
const getItems = (jobs, offset = 0) =>
	jobs.map((job, index) => {
		return {
			id: `item-${index + offset}`,
			content: `${job.companyName} ${job.rating}`,
		};
	});

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

	destClone.splice(droppableDestination.index, 0, removed);

	const result = {};
	result[droppableSource.droppableId] = sourceClone;
	result[droppableDestination.droppableId] = destClone;

	return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
	
	userSelect: 'none',
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,

	// change background colour if dragging
	background: isDragging ? 'lightgreen' : '#38EFE7',

	// styles need to apply on draggables
	...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
	background: isDraggingOver ? 'lightblue' : 'white',
	padding: grid,
	width: 250,
});

class JobsDnd extends Component {
	state = {
		items: [],
		selected: [],
		technical: [],
		offer: [],
	};

	componentDidMount() {
		const firstColumn = getItems(this.props.jobs.filter((job) => job.status === 'phone interview'));
		const secondColumnOffset = firstColumn.length;
		const secondColumn = getItems(
			this.props.jobs.filter((job) => job.status === 'in person interview'),
			secondColumnOffset
		);
		const thirdColumnOffSet = firstColumn.length + secondColumn.length;
		const thirdColumn = getItems(
			this.props.jobs.filter((job) => job.status === 'technical interview'),
			thirdColumnOffSet
		);
		const fourthColumnOffset = firstColumn.length + secondColumn.length + thirdColumn.length;
		const fourthColumn = getItems(
			this.props.jobs.filter((job) => job.status === 'offer'),
			fourthColumnOffset
		);

		this.setState({
			items: firstColumn,
			selected: secondColumn,
			technical: thirdColumn,
			offer: fourthColumn,
		});
	}

	id2List = {
		droppable: 'items',
		droppable2: 'selected',
		droppable3: 'technical',
		droppable4: 'offer',
	};

	getList = (id) => this.state[this.id2List[id]];

	onDragEnd = (result) => {
		const { source, destination } = result;

		// dropped outside the list
		if (!destination) {
			return;
		}

		if (source.droppableId === destination.droppableId) {
			const items = reorder(this.getList(source.droppableId), source.index, destination.index);

			let state = { items };

			if (source.droppableId === 'droppable2') {
				state = { selected: items };
			}
			if (source.droppableId === 'droppable3') {
				state = { technical: items };
			}
			if (source.droppableId === 'droppable4') {
				state = { offer: items };
			}
			this.setState(state);
		} else {
			const result = move(this.getList(source.droppableId), this.getList(destination.droppableId), source, destination);

			let newState = {};

			if (destination.droppableId === 'droppable' || source.droppableId === 'droppable') {
				newState.items = result.droppable;
			}

			if (destination.droppableId === 'droppable2' || source.droppableId === 'droppable2') {
				newState.selected = result.droppable2;
			}

			if (destination.droppableId === 'droppable3' || source.droppableId === 'droppable3') {
				newState.technical = result.droppable3;
			}

			if (destination.droppableId === 'droppable4' || source.droppableId === 'droppable4') {
				newState.offer = result.droppable4;
			}

			this.setState(newState);
		}
	};

	
	render() {
		const { items, selected, technical, offer } = this.state;

		const is1stColumnUndefined = items.find((item) => item === undefined);
		const is2ndColumnUndefined = selected.find((item) => item === undefined);
		const is3rdColumnUndefined = technical.find((item) => item === undefined);
		const is4thColumnUndefined = offer.find((item) => item === undefined);

		if (is1stColumnUndefined || is2ndColumnUndefined || is3rdColumnUndefined || is4thColumnUndefined) {
			return <span></span>;
		}

		return (
			<div className="jobs-dnd-container">
				<DragDropContext onDragEnd={this.onDragEnd}>
					<Droppable droppableId="droppable">
						{(provided, snapshot) => {
							return (
								<div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
									{this.state.items.map((item, index) => {
										return (
											<Draggable key={item.id} draggableId={item.id} index={index}>
												{(provided, snapshot) => (
													<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
														{item.content}
													</div>
												)}
											</Draggable>
										);
									})}
									{provided.placeholder}
								</div>
							);
						}}
					</Droppable>
					<Droppable droppableId="droppable2">
						{(provided, snapshot) => (
							<div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
								{this.state.selected.map((item, index) => (
									<Draggable key={item.id} draggableId={item.id} index={index}>
										{(provided, snapshot) => (
											<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
												{item.content}
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
					<Droppable droppableId="droppable3">
						{(provided, snapshot) => (
							<div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
								{this.state.technical.map((item, index) => (
									<Draggable key={item.id} draggableId={item.id} index={index}>
										{(provided, snapshot) => (
											<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
												{item.content}
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
					<Droppable droppableId="droppable4">
						{(provided, snapshot) => {
							return (
								<div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
									{this.state.offer.map((item, index) => {
										return (
											<Draggable key={item.id} draggableId={item.id} index={index}>
												{(provided, snapshot) => (
													<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
														{item.content}
													</div>
												)}
											</Draggable>
										);
									})}
									{provided.placeholder}
								</div>
							);
						}}
					</Droppable>
				</DragDropContext>
			</div>
		);
	}
}

export default JobsDnd;
