angular.module('bahmni.common.conceptSet')
    .directive('concept', ['RecursionHelper', 'spinner', 'conceptSetService', '$filter', '$location', function (RecursionHelper, spinner, conceptSetService, $filter, $location, scrollToService) {
        var link = function (scope, element, attributes) {
            var conceptMapper = new Bahmni.Common.Domain.ConceptMapper();
            scope.showTitle = scope.showTitle === undefined ? true : scope.showTitle;

            scope.cloneNew = function (observation, parentObservation) {
                var newObs = observation.cloneNew();
                var index = parentObservation.groupMembers.indexOf(observation);
                parentObservation.groupMembers.splice(index + 1, 0, newObs);
                jQuery.scrollTo(element)
            };

            scope.getStringValue = function (observations) {
                return observations.map(function (observation) {
                    return observation.value + ' (' + $filter('bahmniDate')(observation.date) + ")";
                }).join(", ");
            };
            scope.selectOptions = function (codedConcept) {
                var answers = _.sortBy(_.uniq(codedConcept.answers, _.property('uuid')).map(conceptMapper.map), 'name');
                return {
                    data: answers,
                    query: function (options) {
                        return options.callback({results: $filter('filter')(answers, {name: options.term})});
                    },
                    allowClear: true,
                    placeholder: 'Select',
                    formatResult: _.property('name'),
                    formatSelection: _.property('name'),
                    id: _.property('uuid')
                };
            };

            scope.toggleSection = function () {
                scope.collapse = !scope.collapse;
            };

            scope.isCollapsibleSet = function () {
                return scope.showTitle;
            };

            scope.hasPDFAsValue = function () {
                return scope.observation.value && (scope.observation.value.indexOf(".pdf") > 0);
            };

            scope.$watch('collapseInnerSections', function () {
                scope.collapse = scope.collapseInnerSections;
            });

            scope.handleUpdate = function() {
                scope.$root.$broadcast("event:observationUpdated-"+scope.conceptSetName, scope.observation.concept.name);
            }
        };

        var compile = function (element) {
            return RecursionHelper.compile(element, link);
        };

        return {
            restrict: 'E',
            compile: compile,
            scope: {
                conceptSetName: "=",
                observation: "=",
                atLeastOneValueIsSet: "=",
                showTitle: "=",
                conceptSetRequired: "=",
                rootObservation: "=",
                patient: "=",
                collapseInnerSections: "=",
                rootConcept: "&"
            },
            templateUrl: '../common/concept-set/views/observation.html'
        }
    }]);