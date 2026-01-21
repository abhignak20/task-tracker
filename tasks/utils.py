def detect_cycle(start_task, current_task, visited):
    if current_task in visited:
        return True

    visited.add(current_task)

    for dep in current_task.dependencies.all():
        if detect_cycle(start_task, dep.depends_on, visited):
            return True

    visited.remove(current_task)
    return False
